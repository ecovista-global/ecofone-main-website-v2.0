"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  rectIntersection,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  useDroppable,
  useDraggable,
  CollisionDetection,
} from "@dnd-kit/core";
import {
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  GripVertical,
  CheckCircle2,
  AlertCircle,
  X,
  Upload,
  Crop,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Info,
  Maximize2,
  Layers,
  Video,
  ImageIcon,
} from "lucide-react";
import { ImageCropperModal } from "@/components/admin/ImageCropperModal";

// ─── TYPES & DATA MODELS ──────────────────────────────────────

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  media_url: string;
  caption: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

const TOTAL_SLOTS = 30;

// Presets from EcoFone repository assets
const PRESET_ECOFONE_MEDIA = [
  { label: "Grand Ribbon Opening", url: "/gallery_ribbon_opening.jpg" },
  { label: "Store Owner Suresh Launch", url: "/gallery_owner_launch.jpg" },
  { label: "Customer Warranty Handover", url: "/gallery_customer_handover.jpg" },
  { label: "Annual Partner Summit", url: "/gallery_partner_meet.jpg" },
  { label: "Hazratganj Flagship Store", url: "/store_hazratganj.jpg" },
  { label: "Alambagh Retail Counter", url: "/store_alambagh.jpg" },
  { label: "Gomti Nagar Storefront", url: "/store_gomtinagar.jpg" },
  { label: "32-Point Diagnostics Lab", url: "/about_ops.jpg" },
  { label: "Store Experience Center", url: "/ecofone_store_hero.jpg" },
  { label: "Modern Retail Consultation", url: "/new_store.jpg" },
];

// ─── UTILITIES & HELPERS ──────────────────────────────────────

function getSizeFromItem(item: GalleryItem | null): string {
  if (!item?.caption) return "1x1";
  const sizeMatch = item.caption.match(/^SIZE:([^|]+)\|/);
  return sizeMatch ? sizeMatch[1] : "1x1";
}

function getCleanCaption(item: GalleryItem | null): string {
  if (!item?.caption) return "";
  return item.caption.replace(/^SIZE:[^|]+\|/, "");
}

function getSizeLabel(size: string): string {
  if (size === "1x2") return "Tall (1×2)";
  if (size === "2x1") return "Wide (2×1)";
  if (size === "2x2") return "Large (2×2)";
  return "Square (1×1)";
}

function getGridStyleFromSize(size: string): React.CSSProperties {
  if (size === "1x2") return { gridColumn: "span 1", gridRow: "span 2" };
  if (size === "2x1") return { gridColumn: "span 2", gridRow: "span 1" };
  if (size === "2x2") return { gridColumn: "span 2", gridRow: "span 2" };
  return { gridColumn: "span 1", gridRow: "span 1" };
}

function getCropAspectForSize(size: string): { aspect: number; label: string } {
  if (size === "2x1") return { aspect: 664 / 320, label: "2×1 Wide (664:320)" };
  if (size === "1x2") return { aspect: 320 / 664, label: "1×2 Tall (320:664)" };
  if (size === "2x2") return { aspect: 1, label: "2×2 Large Square (1:1)" };
  return { aspect: 1, label: "1×1 Square (1:1)" };
}

// Resilient Collision Detection for multi-row masonry
const customCollisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  if (pointerCollisions.length > 0) return pointerCollisions;
  const rectCollisions = rectIntersection(args);
  if (rectCollisions.length > 0) return rectCollisions;
  return closestCenter(args);
};

// ─── GALLERY SLOT COMPONENT (DRAGGABLE + DROPPABLE) ───────────

interface GallerySlotProps {
  slotIndex: number;
  item: GalleryItem | null;
  isLocked: boolean;
  dragActiveId: string | null;
  dragActiveSize: string | null;
  onDoubleClick: (slotIndex: number, item: GalleryItem | null) => void;
  onEdit: (slotIndex: number, item: GalleryItem) => void;
  onDelete: (id: string) => void;
}

function GallerySlot({
  slotIndex,
  item,
  isLocked,
  dragActiveId,
  dragActiveSize,
  onDoubleClick,
  onEdit,
  onDelete,
}: GallerySlotProps) {
  const id = item ? item.id : `empty-slot-${slotIndex}`;
  const size = item ? getSizeFromItem(item) : "1x1";
  const gridStyle = getGridStyleFromSize(size);

  const isCurrentActive = dragActiveId === id;
  const isDragInProgress = dragActiveId !== null;

  // Outer container is Droppable
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id,
    disabled: isLocked && !item,
  });

  // Inner container is Draggable
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id,
    disabled: !item || isLocked,
  });

  // Strict Rule: CAN RECEIVE DROP ONLY IF EXACT SAME SIZE
  const canReceiveDrop =
    isDragInProgress &&
    !isCurrentActive &&
    (item ? dragActiveSize === size : dragActiveSize === "1x1");

  // 1. EMPTY SLOT RENDER
  if (!item) {
    const isTargetMatch = isDragInProgress && canReceiveDrop;
    const isInvalidTarget = isDragInProgress && !canReceiveDrop && !isCurrentActive;

    return (
      <div
        ref={setDropRef}
        style={gridStyle}
        onDoubleClick={() => !isLocked && onDoubleClick(slotIndex, null)}
        className={`relative rounded-3xl flex flex-col items-center justify-center w-full h-full transition-all duration-200 select-none overflow-hidden group
          ${
            isLocked
              ? "bg-slate-100/60 border-2 border-dashed border-slate-200 cursor-not-allowed opacity-40"
              : "bg-white/80 border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/40 cursor-pointer shadow-sm hover:shadow"
          }
          ${isTargetMatch && isOver ? "!border-emerald-500 !bg-emerald-50 ring-4 ring-emerald-400 scale-[1.02] z-20" : ""}
          ${isTargetMatch && !isOver ? "!border-emerald-400 !bg-emerald-50/40 border-dashed animate-pulse" : ""}
          ${isInvalidTarget ? "opacity-30 border-dashed border-slate-200 bg-slate-100 cursor-not-allowed" : ""}
        `}
      >
        {isTargetMatch && isOver ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">Drop Here</span>
            <span className="text-[10px] text-emerald-600 font-semibold">Slot #{slotIndex + 1}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 group-hover:bg-emerald-100 text-slate-400 group-hover:text-emerald-700 flex items-center justify-center mb-2 transition-colors">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Slot {slotIndex + 1}
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5">
              Double-click to add
            </span>
            <span className="text-[9px] uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full mt-2 font-mono">
              1×1 Square
            </span>
          </div>
        )}
      </div>
    );
  }

  // 2. FILLED SLOT RENDER
  const isMatchAndHovered = canReceiveDrop && isOver;
  const isMatchAndNotHovered = canReceiveDrop && !isOver;
  const isDifferentSizeAndDragging = isDragInProgress && !isCurrentActive && !canReceiveDrop;
  const displayCaption = getCleanCaption(item);

  return (
    <div
      ref={setDropRef}
      style={gridStyle}
      className={`relative rounded-3xl w-full h-full transition-all duration-200 select-none
        ${isMatchAndHovered ? "!ring-4 !ring-emerald-400 shadow-2xl scale-[1.02] z-30" : ""}
        ${isMatchAndNotHovered ? "!ring-2 !ring-emerald-400/80 shadow-md" : ""}
        ${isDifferentSizeAndDragging ? "opacity-30 grayscale-[80%]" : ""}
      `}
    >
      <div
        ref={setDragRef}
        onDoubleClick={() => onDoubleClick(slotIndex, item)}
        className={`relative group bg-[#0f172a] rounded-3xl overflow-hidden flex flex-col w-full h-full border border-slate-700/80 shadow-md hover:shadow-xl transition-all
          ${isDragging ? "opacity-20 scale-95 ring-2 ring-emerald-400" : "opacity-100"}
        `}
      >
        {/* Media Preview Area */}
        <div
          {...attributes}
          {...listeners}
          className="flex-grow relative overflow-hidden bg-slate-900 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={item.media_url}
            alt={displayCaption || "Gallery Item"}
            fill
            className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />

          {/* Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Size & Slot Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
            <span className="text-[11px] font-black bg-black/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg border border-white/10 font-mono">
              #{slotIndex + 1}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-600/90 backdrop-blur-md text-white shadow-sm border border-emerald-400/30">
              {getSizeLabel(size)}
            </span>
            {item.type === "video" && (
              <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-red-600/90 text-white flex items-center gap-1">
                <Video className="w-3 h-3" /> Video
              </span>
            )}
          </div>

          {/* Quick Action Buttons (Edit / Delete) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-30">
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(slotIndex, item);
              }}
              title="Edit Slot"
              className="bg-slate-900/90 hover:bg-emerald-600 text-white w-8 h-8 rounded-xl backdrop-blur-md border border-white/20 transition-all flex items-center justify-center cursor-pointer shadow-lg"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Remove item from slot #${slotIndex + 1}?`)) {
                  onDelete(item.id);
                }
              }}
              title="Delete Item"
              className="bg-rose-600/90 hover:bg-rose-700 text-white w-8 h-8 rounded-xl backdrop-blur-md transition-all flex items-center justify-center cursor-pointer shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Green Overlay when hovered during swap */}
          {isMatchAndHovered && (
            <div className="absolute inset-0 bg-emerald-600/50 backdrop-blur-[2px] flex flex-col items-center justify-center pointer-events-none z-20">
              <div className="bg-emerald-500 text-white rounded-2xl px-5 py-2.5 font-black text-xs shadow-2xl tracking-wider uppercase border border-white/20 animate-bounce">
                SWAP WITH THIS BLOCK
              </div>
            </div>
          )}

          {/* Red Mismatch Overlay */}
          {isDifferentSizeAndDragging && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center pointer-events-none z-20">
              <span className="bg-rose-950/90 text-rose-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-rose-500/30">
                Size mismatch ({size})
              </span>
            </div>
          )}

          {/* Caption preview over bottom of image */}
          <div className="absolute bottom-2 left-3 right-3 pointer-events-none z-10">
            <p className="text-white text-xs font-semibold line-clamp-1 drop-shadow">
              {displayCaption || "EcoFone Gallery Item"}
            </p>
          </div>
        </div>

        {/* Bottom Status Bar with Grip Handle */}
        <div className="px-3 py-2 border-t border-slate-800 flex justify-between items-center bg-slate-950 h-10 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate mr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="truncate">{displayCaption || "No Caption"}</span>
          </div>
          <div
            {...attributes}
            {...listeners}
            title="Drag to swap"
            className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-emerald-400 px-1 py-0.5 rounded transition-colors"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FLOATING DRAG OVERLAY ────────────────────────────────────

function DragOverlayCard({ item }: { item: GalleryItem }) {
  if (!item) return null;
  const size = getSizeFromItem(item);
  const w = 320 * (size === "2x1" || size === "2x2" ? 2 : 1);
  const h = 320 * (size === "1x2" || size === "2x2" ? 2 : 1);

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-400 ring-8 ring-emerald-500/20 bg-[#0f172a] flex flex-col pointer-events-none scale-105 transition-transform"
      style={{ width: `${w}px`, height: `${h}px` }}
    >
      <div className="flex-grow relative bg-slate-900">
        <Image src={item.media_url} alt="Dragging" fill className="object-cover" unoptimized />
        <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Swapping {getSizeLabel(size)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN GALLERY MANAGER COMPONENT ───────────────────────────

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Drag states
  const [dragActiveId, setDragActiveId] = useState<string | null>(null);
  const [dragActiveItem, setDragActiveItem] = useState<GalleryItem | null>(null);
  const [dragActiveSize, setDragActiveSize] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Modal states for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Form states
  const [formType, setFormType] = useState<"image" | "video">("image");
  const [formSize, setFormSize] = useState<string>("1x1");
  const [formCaption, setFormCaption] = useState<string>("");
  const [formMediaUrl, setFormMediaUrl] = useState<string>("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [formFilePreview, setFormFilePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Image Cropper Modal
  const [cropModalSrc, setCropModalSrc] = useState<string | null>(null);

  // Drag Sensor Config (distance: 8 prevents click conflicts)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const showStatus = (type: "success" | "error" | "info", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Error fetching gallery items:", err);
      showStatus("error", "Failed to load gallery items");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Construct array of exactly 30 slots
  const slots: (GalleryItem | null)[] = Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
    return items.find((item) => item.display_order === i) || null;
  });

  const firstEmptyIndex = slots.findIndex((s) => !s);
  const maxAllowedSlot = firstEmptyIndex === -1 ? TOTAL_SLOTS - 1 : firstEmptyIndex;

  // Scroll horizontal gallery
  const scrollHorizontal = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // ─── OPEN MODALS ──────────────────────────────────────────

  const openAddModal = (slotIndex: number) => {
    setActiveSlotIndex(slotIndex);
    setEditingItem(null);
    setFormType("image");
    setFormSize("1x1");
    setFormCaption("");
    setFormMediaUrl("/gallery_ribbon_opening.jpg");
    setFormFile(null);
    setFormFilePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (slotIndex: number, item: GalleryItem) => {
    setActiveSlotIndex(slotIndex);
    setEditingItem(item);
    setFormType(item.type || "image");
    setFormSize(getSizeFromItem(item));
    setFormCaption(getCleanCaption(item));
    setFormMediaUrl(item.media_url);
    setFormFile(null);
    setFormFilePreview(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFormFile(file);
    setFormFilePreview(previewUrl);
    // Prompt crop
    setCropModalSrc(previewUrl);
  };

  const handleCropComplete = (croppedFile: File) => {
    const croppedUrl = URL.createObjectURL(croppedFile);
    setFormFile(croppedFile);
    setFormFilePreview(croppedUrl);
    setFormMediaUrl(croppedUrl);
    setCropModalSrc(null);
  };

  // ─── FORM SUBMISSION (SAVE / CREATE) ──────────────────────

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const fullCaption = `SIZE:${formSize}|${formCaption.trim()}`;

      if (editingItem) {
        // Update existing item
        let body: any;
        let isMultipart = false;

        if (formFile) {
          isMultipart = true;
          const formData = new FormData();
          formData.append("media", formFile);
          formData.append("caption", fullCaption);
          formData.append("type", formType);
          body = formData;
        } else {
          body = JSON.stringify({
            caption: fullCaption,
            type: formType,
            media_url: formMediaUrl,
          });
        }

        const res = await fetch(`/api/admin/gallery/${editingItem.id}`, {
          method: "PUT",
          headers: isMultipart ? undefined : { "Content-Type": "application/json" },
          body,
        });

        if (!res.ok) throw new Error("Failed to update item");
        showStatus("success", `Updated slot #${activeSlotIndex + 1} successfully!`);
      } else {
        // Create new item in active slot
        let body: any;
        let isMultipart = false;

        if (formFile) {
          isMultipart = true;
          const formData = new FormData();
          formData.append("media", formFile);
          formData.append("caption", fullCaption);
          formData.append("type", formType);
          formData.append("display_order", String(activeSlotIndex));
          body = formData;
        } else {
          body = JSON.stringify({
            caption: fullCaption,
            type: formType,
            media_url: formMediaUrl,
            display_order: activeSlotIndex,
          });
        }

        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: isMultipart ? undefined : { "Content-Type": "application/json" },
          body,
        });

        if (!res.ok) throw new Error("Failed to create gallery item");
        showStatus("success", `Added new media to slot #${activeSlotIndex + 1}!`);
      }

      setIsModalOpen(false);
      await fetchItems();
    } catch (err: any) {
      console.error(err);
      showStatus("error", err.message || "Failed to save item");
    } finally {
      setIsSaving(false);
    }
  };

  // ─── DELETE ITEM ──────────────────────────────────────────

  const handleDeleteItem = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
      showStatus("success", "Item deleted from gallery");
      if (isModalOpen) setIsModalOpen(false);
      await fetchItems();
    } catch (err: any) {
      console.error(err);
      showStatus("error", "Failed to delete item");
    }
  };

  // ─── DND ENGINE ───────────────────────────────────────────

  const handleDragStart = (event: DragStartEvent) => {
    const id = String(event.active.id);
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setDragActiveId(id);
    setDragActiveSize(getSizeFromItem(item));
    setDragActiveItem(item);
  };

  const getSlotIndex = (id: string) => {
    if (id.startsWith("empty-slot-")) return parseInt(id.replace("empty-slot-", ""), 10);
    return slots.findIndex((s) => s && s.id === id);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setDragActiveId(null);
    setDragActiveSize(null);
    setDragActiveItem(null);

    if (!over || active.id === over.id) return;

    const activeIndex = getSlotIndex(String(active.id));
    const overIndex = getSlotIndex(String(over.id));

    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) return;

    const activeItem = slots[activeIndex];
    const overItem = slots[overIndex];
    if (!activeItem) return;

    const activeSize = getSizeFromItem(activeItem);
    const overSize = overItem ? getSizeFromItem(overItem) : "1x1";

    // 1. STRICT SIZE VERIFICATION
    if (activeSize !== overSize) {
      alert(
        `Swap Rejected: ${getSizeLabel(activeSize)} can only swap with another ${getSizeLabel(activeSize)} block.\n\nStrict masonry alignment requires matching block sizes to prevent layout degradation.`
      );
      return;
    }

    // 2. OPTIMISTIC UI SWAP
    const newItems = items.map((it) => ({ ...it }));
    const activeInState = newItems.find((i) => i.id === activeItem.id);
    if (!activeInState) return;

    const updates: { id: string; display_order: number }[] = [];

    if (overItem) {
      const overInState = newItems.find((i) => i.id === overItem.id);
      if (overInState) {
        activeInState.display_order = overIndex;
        overInState.display_order = activeIndex;
        updates.push({ id: activeItem.id, display_order: overIndex });
        updates.push({ id: overItem.id, display_order: activeIndex });
      }
    } else {
      // Empty slot drop (1x1 only)
      if (activeSize !== "1x1") return;
      activeInState.display_order = overIndex;
      updates.push({ id: activeItem.id, display_order: overIndex });
    }

    // Instant local state update for 60fps responsiveness
    setItems(newItems);
    showStatus("info", `Swapped Slot #${activeIndex + 1} with Slot #${overIndex + 1}`);

    // 3. PERSIST REORDER TO BACKEND
    try {
      const res = await fetch("/api/admin/gallery/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updates }),
      });
      if (!res.ok) throw new Error("Server reorder failed");
    } catch (error) {
      console.error("Reorder sync failed:", error);
      showStatus("error", "Reorder failed to save on server. Rolling back...");
      fetchItems();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-[#0e2a1f] via-[#123829] to-[#164230] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
        
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Interactive Visual CMS
              </span>
              <span className="text-slate-300 text-xs font-mono">
                {items.length} / {TOTAL_SLOTS} Slots Occupied
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Store Moments & Community Gallery
            </h2>
            
            <p className="text-slate-300 text-sm mt-1 max-w-2xl font-normal leading-relaxed">
              Drag and drop to rearrange photos on the horizontal masonry canvas. Double-click any block or empty slot to upload photos, adjust block sizes, or crop images.
            </p>
          </div>

          {/* Quick Actions & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openAddModal(maxAllowedSlot)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add to Next Empty Slot</span>
            </button>

            <button
              onClick={() => fetchItems()}
              disabled={isLoading}
              title="Refresh Gallery"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm p-3 rounded-2xl backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer border border-white/10"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Legend Strip */}
        <div className="mt-6 pt-5 border-t border-emerald-800/60 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-400" /> Swap Rules:
          </span>
          <span className="bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-700/50 text-emerald-300">
            ✓ 1×1 swaps with 1×1
          </span>
          <span className="bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-700/50 text-emerald-300">
            ✓ 2×1 swaps with 2×1
          </span>
          <span className="bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-700/50 text-emerald-300">
            ✓ 1×2 swaps with 1×2
          </span>
          <span className="bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700/50 text-slate-400">
            Double-click to edit or add media
          </span>
        </div>

      </div>

      {/* Floating Status Notification Toast */}
      {statusMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold animate-slide-up transition-all ${
            statusMessage.type === "success"
              ? "bg-emerald-600 text-white shadow-emerald-900/40"
              : statusMessage.type === "error"
              ? "bg-rose-600 text-white shadow-rose-900/40"
              : "bg-slate-900 text-emerald-300 border border-emerald-500/30"
          }`}
        >
          {statusMessage.type === "success" && <CheckCircle2 className="w-5 h-5" />}
          {statusMessage.type === "error" && <AlertCircle className="w-5 h-5" />}
          {statusMessage.type === "info" && <Sparkles className="w-5 h-5 text-emerald-400" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Horizontal Scroll Navigation Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Canvas Navigator (30 Slots)
          </span>
          <span className="text-xs text-slate-400">• Scroll horizontally or use arrows</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollHorizontal("left")}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            title="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollHorizontal("right")}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            title="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* DND Canvas Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={customCollisionDetection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="w-full bg-slate-900/5 border border-slate-200/80 rounded-3xl p-6 shadow-inner">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
            style={{ scrollBehavior: "smooth" }}
          >
            <div
              className="grid gap-6 min-w-max pb-2 px-1"
              style={{
                gridTemplateRows: "repeat(2, 320px)",
                gridAutoColumns: "320px",
                gridAutoFlow: "column dense",
              }}
            >
              {slots.map((item, i) => (
                <GallerySlot
                  key={item ? item.id : `empty-slot-${i}`}
                  slotIndex={i}
                  item={item}
                  isLocked={i > maxAllowedSlot}
                  dragActiveId={dragActiveId}
                  dragActiveSize={dragActiveSize}
                  onDoubleClick={(slot, it) => {
                    if (it) openEditModal(slot, it);
                    else openAddModal(slot);
                  }}
                  onEdit={(slot, it) => openEditModal(slot, it)}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Drag Overlay for cursor-following preview */}
        <DragOverlay dropAnimation={null}>
          {dragActiveItem ? <DragOverlayCard item={dragActiveItem} /> : null}
        </DragOverlay>
      </DndContext>

      {/* ─── ADD / EDIT MEDIA MODAL ─────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#0f281e] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  Slot #{activeSlotIndex + 1}
                </span>
                <h3 className="text-xl font-black mt-1">
                  {editingItem ? "Edit Gallery Block" : "Add Media to Gallery"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveItem} className="p-6 overflow-y-auto space-y-6 flex-grow">
              
              {/* Size Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Block Size & Layout on Canvas
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "1x1", label: "Square", sub: "1 col × 1 row", icon: "■" },
                    { id: "2x1", label: "Wide", sub: "2 cols × 1 row", icon: "▬" },
                    { id: "1x2", label: "Tall", sub: "1 col × 2 rows", icon: "▮" },
                    { id: "2x2", label: "Large", sub: "2 cols × 2 rows", icon: "⯀" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setFormSize(s.id)}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        formSize === s.id
                          ? "border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-400 text-emerald-950 font-bold shadow-sm"
                          : "border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-base font-black">{s.icon}</span>
                        <span className="text-[10px] font-mono uppercase bg-slate-200/60 px-1.5 py-0.5 rounded">
                          {s.id}
                        </span>
                      </div>
                      <span className="text-sm font-bold">{s.label}</span>
                      <span className="text-[10px] text-slate-500">{s.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Media Type Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Media Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="mediaType"
                      value="image"
                      checked={formType === "image"}
                      onChange={() => setFormType("image")}
                      className="accent-emerald-600"
                    />
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <span>Photo / Image</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="mediaType"
                      value="video"
                      checked={formType === "video"}
                      onChange={() => setFormType("video")}
                      className="accent-emerald-600"
                    />
                    <Video className="w-4 h-4 text-red-600" />
                    <span>Video Embed</span>
                  </label>
                </div>
              </div>

              {/* Image Upload & Presets */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Photo or Upload from Device
                </label>

                {/* File Upload Box */}
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl bg-slate-50/50 transition-colors">
                  <div className="w-20 h-20 rounded-xl bg-slate-200 relative overflow-hidden flex items-center justify-center shrink-0 border border-slate-300">
                    {formFilePreview || formMediaUrl ? (
                      <Image
                        src={formFilePreview || formMediaUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <p className="text-xs font-bold text-slate-800">
                      Upload from Computer / Mobile
                    </p>
                    <p className="text-[11px] text-slate-500">
                      JPG, PNG, WebP supported. Opens interactive cropper aligned to {getSizeLabel(formSize)}.
                    </p>
                    <div className="flex items-center gap-2 pt-1 justify-center sm:justify-start">
                      <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>

                      {(formFilePreview || formMediaUrl) && (
                        <button
                          type="button"
                          onClick={() => setCropModalSrc(formFilePreview || formMediaUrl)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold cursor-pointer"
                        >
                          <Crop className="w-3.5 h-3.5" />
                          <span>Crop Again</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Presets Carousel */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Or Pick from Verified EcoFone Photos:
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {PRESET_ECOFONE_MEDIA.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => {
                          setFormMediaUrl(preset.url);
                          setFormFile(null);
                          setFormFilePreview(null);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all cursor-pointer border ${
                          formMediaUrl === preset.url && !formFile
                            ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom URL Input */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Direct Media / Image URL
                  </label>
                  <input
                    type="text"
                    value={formMediaUrl}
                    onChange={(e) => setFormMediaUrl(e.target.value)}
                    placeholder="https://... or /gallery_photo.jpg"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Caption Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Story Caption
                </label>
                <input
                  type="text"
                  value={formCaption}
                  onChange={(e) => setFormCaption(e.target.value)}
                  placeholder="e.g. Grand Opening Ceremony of Hazratganj Experience Center"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  The size prefix (<code className="font-mono text-emerald-600">SIZE:{formSize}|</code>) will be saved automatically with your caption.
                </p>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {editingItem ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(editingItem.id)}
                    className="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Item</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-[#0e2a1f] hover:bg-[#061810] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : editingItem ? "Update Block" : "Add to Gallery"}
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ─── IMAGE CROPPER MODAL ────────────────────────────── */}
      {cropModalSrc && (
        <ImageCropperModal
          imageSrc={cropModalSrc}
          aspect={getCropAspectForSize(formSize).aspect}
          aspectLabel={getCropAspectForSize(formSize).label}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropModalSrc(null)}
        />
      )}

    </div>
  );
}
