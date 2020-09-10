interface ImperiumConfigModuleReturn {
	name: string;
	webpack: {
		client: {
			rules: {
				test: RegExp;
				exclude: RegExp;
				use: any[];
			}[];
		};
	};
}

export default function imperiumConfigModuleFunc(): ImperiumConfigModuleReturn;
