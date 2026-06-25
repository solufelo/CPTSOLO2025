import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import ServiceCard from '../components/ServiceCard';
import { serviceCategories } from '../data/servicesData';
import { useTheme } from '../context/ThemeContext';

/**
 * Services — dev + media capabilities with stable inline previews (no cursor-chase GSAP).
 * Data: src/data/servicesData.js (future: /api/services from DB).
 */
const Services = () => {
  const { theme } = useTheme();

  const getSectionBg = () => {
    if (theme === 'light') return 'bg-black text-white';
    if (theme === 'glass') return 'bg-black/40 backdrop-blur-md';
    return 'bg-DarkLava';
  };

  const getCategoryTitle = () => (theme === 'light' ? 'text-white' : 'text-white');
  const getCategoryDesc = () => (theme === 'light' ? 'text-gray-300' : 'text-white/70');

  const intro =
    'Full-stack builds and motion work — scoped honestly, shipped with clear demos and source.';

  return (
    <section id="services" className={`min-h-0 rounded-t-4xl py-16 md:py-24 ${getSectionBg()}`}>
      <AnimatedHeaderSection
        subTitle="What I build"
        title="Services"
        text={intro}
        textColor="text-white"
        withScrollTrigger={false}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-16">
        {serviceCategories.map((category) => (
          <div key={category.id}>
            <div className="mb-6 md:mb-8">
              <h3 className={`font-display text-2xl md:text-3xl font-bold ${getCategoryTitle()}`}>
                {category.title}
              </h3>
              <p className={`mt-2 max-w-2xl font-body ${getCategoryDesc()}`}>{category.description}</p>
            </div>

            <div className="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
