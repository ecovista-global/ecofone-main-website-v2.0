import re

file_path = r'd:\ecofone main website\frontend\app\page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import if missing
if 'import InvestorModel from "../components/investor-model";' not in content:
    content = content.replace(
        'import TopBrands from "../components/top-brands";',
        'import TopBrands from "../components/top-brands";\nimport InvestorModel from "../components/investor-model";'
    )

# Use regex to find the block to replace
# Looking for `{/* 3. Interactive ROI Simulator Card */}` up to `</ScrollReveal>` before `{/* 4. Triple Revenue Business Model`
pattern = re.compile(r'\{\/\*\s*3\.\s*Interactive ROI Simulator Card\s*\*\/\}.*?<\/ScrollReveal>', re.DOTALL)

replacement = """{/* 3. Investor Model Section */}
      <ScrollReveal className="w-full bg-white">
        <InvestorModel />
      </ScrollReveal>"""

new_content, count = pattern.subn(replacement, content, count=1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Replaced {count} instances.")
