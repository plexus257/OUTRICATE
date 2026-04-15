import Hero from '@/components/home/Hero';
import ValueProp from '@/components/home/ValueProp';
import ProductShowcase from '@/components/home/ProductShowcase';
import BrandMark from '@/components/home/BrandMark';
import SocialProof from '@/components/home/SocialProof';
import BottomCTA from '@/components/home/BottomCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProp />
      <ProductShowcase />
      <BrandMark />
      <SocialProof />
      <BottomCTA />
    </>
  );
}
