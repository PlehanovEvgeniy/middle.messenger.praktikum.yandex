import Block from '../modules/Block';

export default function getFormValues(this: any) {
	const fields = document.querySelectorAll('input');
	fields.forEach(field => {
		this.formValues[field.name] = field.value;
	});
	this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
}
