import GradientText from "../ui/GradientText";

export default function Header() {

  return (
    <header className="flex justify-between items-center p-4">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={false}
        className="custom-class text-3xl"
      >
        TextGenie
      </GradientText>
      
    </header>
  );
}
