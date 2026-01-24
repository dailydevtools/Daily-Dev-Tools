

interface ToolPageHeaderProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export default function ToolPageHeader({ title, description, icon }: ToolPageHeaderProps) {
    return (
        <div className="text-center mb-10">
            {icon && (
                <div className="bg-[#f973161a] text-[#fb923c] flex items-center justify-center rounded-xl border border-[#f9731633] transition-transform duration-300 hover:scale-110 w-16 h-16 mx-auto mb-6">
                    {icon}
                </div>
            )}
            <h1 className="text-4xl font-extrabold text-[var(--title-color)] mb-3">{title}</h1>
            <p className="text-[var(--muted-text)] text-base">{description}</p>
        </div>
    );
}
