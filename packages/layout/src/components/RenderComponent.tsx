export function RenderComponent({render, ...rest}: {render: (props: unknown) => JSX.Element | null}) {
	return render(rest);
}
