interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode

}


const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:scale-105 hover:shadow-lg transition">
    <div className="w-18 h-18 rounded-full bg-blue-600/10 text-blue-700 flex items-center justify-center mx-auto mb-6">
    
        {icon}
  
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard