import Block from './Block';

export function getFormValues(this: any) {
	const fields = document.querySelectorAll('input');
	fields.forEach(field => {
		this.formValues[field.name] = field.value;
	});
	this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
}
