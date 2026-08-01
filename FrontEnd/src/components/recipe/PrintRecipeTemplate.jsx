import { forwardRef } from 'react';
import { getRecipeImage } from './RecipeCard';

const PrintRecipeTemplate = forwardRef(({ recipe }, ref) => {
  if (!recipe) return null;

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  return (
    <div ref={ref} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
      <div className="print-page" style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '12mm 16mm',
        backgroundColor: '#FDF9F4',
        fontFamily: "'DM Sans', sans-serif",
        color: '#1A1A1A',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6mm' }}>
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '8pt',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#6B6462',
              marginBottom: '3mm',
            }}>
              REGIONAL SPECIALTIES
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '28pt',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.1,
              marginBottom: '4mm',
            }}>
              {recipe.name}
            </h1>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2mm',
            color: '#E85D2C',
            fontSize: '8pt',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            <span>📍</span>
            <span>{recipe.region}</span>
          </div>
        </div>

        {/* Metadata Row */}
        <div style={{
          display: 'flex',
          gap: '8mm',
          borderTop: '1px solid #E8E0D8',
          borderBottom: '1px solid #E8E0D8',
          padding: '4mm 0',
          marginBottom: '6mm',
        }}>
          {[
            { label: 'PREP TIME', value: recipe.prepTime.replace(' mins', ''), unit: 'min' },
            { label: 'COOK TIME', value: recipe.cookTime.replace(' mins', ''), unit: 'min' },
            { label: 'SERVES', value: String(recipe.servings).padStart(2, '0'), unit: 'ppl' },
            { label: 'DIFFICULTY', value: recipe.difficulty, unit: '', isOrange: true },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, textAlign: i === 0 ? 'left' : 'left' }}>
              <p style={{ fontSize: '7pt', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9490', marginBottom: '1mm' }}>
                {item.label}
              </p>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: item.isOrange ? '11pt' : '18pt',
                fontWeight: item.isOrange ? 700 : 600,
                color: item.isOrange ? '#E85D2C' : '#1A1A1A',
              }}>
                {item.value}
                {item.unit && (
                  <span style={{ fontSize: '9pt', fontWeight: 400, color: '#6B6462', marginLeft: '1mm' }}>
                    {item.unit}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column Content */}
        <div style={{ display: 'flex', gap: '8mm' }}>
          {/* Left Column - Image + Ingredients */}
          <div style={{ width: '45%' }}>
            {/* Recipe Image */}
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: '4mm',
              overflow: 'hidden',
              marginBottom: '6mm',
              position: 'relative',
            }}>
              <img
                src={getRecipeImage(recipe.slug)}
                alt={recipe.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                crossOrigin="anonymous"
              />
            </div>

            {/* Ingredients */}
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '16pt',
              fontWeight: 600,
              color: '#E85D2C',
              marginBottom: '4mm',
            }}>
              Ingredients
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recipe.ingredients.map((ing, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '3mm',
                  marginBottom: '2.5mm',
                  fontSize: '9pt',
                  color: '#4A4440',
                  lineHeight: 1.5,
                }}>
                  <span style={{ color: '#E85D2C', fontSize: '6pt', marginTop: '1.5mm' }}>◆ ◆</span>
                  {ing}
                </li>
              ))}
            </ul>

            {/* Nutrition */}
            <div style={{ marginTop: '6mm' }}>
              <p style={{ fontSize: '7pt', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9490', marginBottom: '3mm' }}>
                NUTRITION PER SERVING
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2mm' }}>
                {[
                  { label: 'CALORIES', value: recipe.nutrition.calories },
                  { label: 'PROTEIN', value: recipe.nutrition.protein },
                  { label: 'CARBS', value: recipe.nutrition.carbs },
                  { label: 'FIBER', value: recipe.nutrition.fiber || recipe.nutrition.fat },
                ].map((item, i) => (
                  <div key={i} style={{
                    border: '1px solid #E8E0D8',
                    borderRadius: '2mm',
                    padding: '2.5mm 3mm',
                  }}>
                    <p style={{ fontSize: '6pt', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E85D2C', marginBottom: '1mm' }}>
                      {item.label}
                    </p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '13pt', fontWeight: 600, color: '#1A1A1A' }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Method + Chef Notes */}
          <div style={{ width: '55%' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '16pt',
              fontWeight: 600,
              color: '#1A1A1A',
              marginBottom: '5mm',
            }}>
              Method
            </h2>

            {recipe.instructions.map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '4mm',
                marginBottom: '5mm',
              }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '22pt',
                  fontWeight: 300,
                  color: '#E8E0D8',
                  lineHeight: 1,
                  minWidth: '10mm',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p style={{ fontSize: '8pt', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '1.5mm' }}>
                    {step.title}
                  </p>
                  <p style={{ fontSize: '9pt', color: '#6B6462', lineHeight: 1.6 }}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Chef's Notes */}
            {recipe.chefNotes && (
              <div style={{
                marginTop: '6mm',
                backgroundColor: '#FFF3ED',
                borderRadius: '3mm',
                padding: '5mm',
                borderLeft: '3px solid #E85D2C',
              }}>
                <p style={{
                  fontSize: '8pt',
                  fontWeight: 700,
                  color: '#E85D2C',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '2mm',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2mm',
                }}>
                  📍 CHEF'S NOTES
                </p>
                <p style={{
                  fontSize: '9pt',
                  color: '#4A4440',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                }}>
                  "{recipe.chefNotes}"
                </p>
              </div>
            )}

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div style={{ marginTop: '6mm', display: 'flex', flexWrap: 'wrap', gap: '2mm' }}>
                {recipe.tags.map((tag, i) => (
                  <span key={i} style={{
                    padding: '1.5mm 4mm',
                    backgroundColor: '#E8E0D8',
                    borderRadius: '10mm',
                    fontSize: '7pt',
                    fontWeight: 500,
                    color: '#4A4440',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8mm',
          paddingTop: '4mm',
          borderTop: '1px solid #E8E0D8',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3mm' }}>
            <div>
              <p style={{ fontSize: '8pt', fontWeight: 700, color: '#E85D2C', letterSpacing: '0.05em' }}>
                FOOD FINDER RECIPE COLLECTION
              </p>
              <p style={{ fontSize: '7pt', color: '#9B9490' }}>
                Designed & Developed by Rushikesh Zambare
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '7pt', color: '#9B9490', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              EXPORTED: {dateStr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

PrintRecipeTemplate.displayName = 'PrintRecipeTemplate';

export default PrintRecipeTemplate;
