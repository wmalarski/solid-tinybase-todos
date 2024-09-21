import { Show, children } from "solid-js";
import { CheckIcon, MinusIcon } from "./icons";
import * as StyledCheckbox from "./styled/checkbox";

export interface CheckboxProps extends StyledCheckbox.RootProps {}

export const Checkbox = (props: CheckboxProps) => {
	const getChildren = children(() => props.children);

	return (
		<StyledCheckbox.Root {...props}>
			<StyledCheckbox.Control>
				<StyledCheckbox.Indicator>
					<CheckIcon />
				</StyledCheckbox.Indicator>
				<StyledCheckbox.Indicator indeterminate>
					<MinusIcon />
				</StyledCheckbox.Indicator>
			</StyledCheckbox.Control>
			<Show when={getChildren()}>
				<StyledCheckbox.Label>{getChildren()}</StyledCheckbox.Label>
			</Show>
			<StyledCheckbox.HiddenInput />
		</StyledCheckbox.Root>
	);
};
