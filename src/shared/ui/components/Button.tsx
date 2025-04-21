interface CustomButtonProps {
	value?: string;
	onClick: () => void;
	image?: string;
	className?: string;
}

const CustomButton = ({ value, onClick, image, className }: CustomButtonProps) => {
	return (
		<button
			className={className}
			onClick={onClick}
		>
			<img
				src={image}
				alt=''
			/>
			{value}
		</button>
	);
};

export default CustomButton;
