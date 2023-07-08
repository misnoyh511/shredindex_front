describe('Double Range Slider', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components--double-range-slider&args=sliderState:withoutGraph');
  });

  const sliderMin = 50;
  const sliderMax = 500;
  const initialLowerVal = 50;
  const initialUpperVal = 500;
  const sliderMedian = ((sliderMin + sliderMax) / 2).toFixed(0);
  const sliderHandleGapPercentage = 2;
  const sliderHandleGap = parseInt(((sliderMax - sliderMin) * (sliderHandleGapPercentage / 100)
  ).toFixed(0), 10);

  it('should render the component', () => {
    cy.get('.double-range-slider').should('exist');
  });

  it('should render the x-axis labels', () => {
    cy.get('.range-slider-x-axis-labels').should('exist');
    cy.get('.resort-card__small-label.text-start').should('have.text', `${sliderMin}`);
    cy.get('.resort-card__small-label.text-center').should('have.text', `${sliderMedian}`);
    cy.get('.resort-card__small-label.text-end').should('have.text', `${sliderMax}`);
  });

  it('should render labels inside the input fields', () => {
    cy.get('.label-inside-input-lower').should('have.text', 'Min');
    cy.get('.label-inside-input-upper').should('have.text', 'Max');
  });

  it('should render a dash between form inputs', () => {
    cy.get('.form-dash-separator').should('have.text', '-');
  });

  it('should update the lower value when the lower range slider is moved', () => {
    cy.get('.double-range-slider').should('exist');
    cy.get('.range-slider-lower').invoke('val', 100).trigger('change', { force: true });
    cy.get('.range-slider-lower').should('have.value', '100');
  });

  it('should update the upper value when the upper range slider is moved', () => {
    cy.get('.range-slider-upper').invoke('val', 100).trigger('change', { force: true });
    cy.get('.range-slider-upper').should('have.value', '100');
  });

  it('should update the lower field value when the lower range slider is moved', () => {
    cy.get('#lower').should('have.value', `${initialLowerVal}`);
    cy.get('#lower').focus({
      force: true,
    });
    cy.get('#lower').realType('{rightarrow}'.repeat(50), { force: true });
    cy.get('#lower').should('have.value', '100');
    cy.get('#lowerInput').should('have.value', '100');
  });

  it('should update the upper field value when the upper range slider is moved', () => {
    cy.get('#upper').should('have.value', `${initialUpperVal}`);
    cy.get('#upper').focus({
      force: true,
    });
    cy.get('#upper').realType('{leftarrow}'.repeat(50), { force: true });
    cy.get('#upper').should('have.value', '450');
    cy.get('#upperInput').should('have.value', '450');
  });

  it('should update the lower value when the lower field value is changed', () => {
    cy.get('.double-range-slider').should('exist');
    cy.get('#lowerInput').clear({ force: true }).type('100', { force: true }).blur({ force: true });
    cy.get('.double-range-slider').click({ force: true });
    cy.get('.range-slider-lower').should('have.value', '100');
  });

  it('should update the upper value when the upper field value is changed', () => {
    cy.get('.double-range-slider').should('exist');
    cy.get('#upperInput').clear({ force: true }).type('100', { force: true }).blur({ force: true });
    cy.get('.double-range-slider').click({ force: true });
    cy.get('.range-slider-upper').should('have.value', '100');
  });

  it(`should not allow the lower value to be greater than the upper value - ${sliderHandleGap}`, () => {
    const upperValue = 400;
    const lowerValue = upperValue - sliderHandleGap;

    cy.get('#lowerInput').realClick({ force: true }).realType('{backspace}{backspace}', { force: true }).realType('450', { force: true });
    cy.get('.double-range-slider').realClick({ force: true });
    cy.get('.range-slider-lower').should('have.value', '450');
    cy.get('#upperInput').realClick({ force: true }).realType('{backspace}{backspace}{backspace}', { force: true }).realType('400', { force: true });
    cy.get('.double-range-slider').realClick({ force: true });
    cy.get('#upperInput').should('have.value', upperValue);
    cy.get('.range-slider-upper').should('have.value', upperValue);
    cy.get('#lowerInput').should('have.value', lowerValue);
    cy.get('.range-slider-lower').should('have.value', lowerValue);
  });

  it(`should not allow the upper value to be less than the lower value + ${sliderHandleGap}`, () => {
    const lowerValue = 450;
    const upperValue = lowerValue + sliderHandleGap;

    cy.get('#upperInput').realClick({ force: true }).realType('{backspace}{backspace}{backspace}', { force: true }).realType('400', { force: true });
    cy.get('.double-range-slider').realClick({ force: true });
    cy.get('.range-slider-upper').should('have.value', '400');
    cy.get('#lowerInput').realClick({ force: true }).realType('{del}{del}{backspace}', { force: true }).realType('450', { force: true });
    cy.get('.double-range-slider').realClick({ force: true });
    cy.get('#lowerInput').should('have.value', lowerValue);
    cy.get('.range-slider-lower').should('have.value', lowerValue);
    cy.get('#upperInput').should('have.value', upperValue);
    cy.get('.range-slider-upper').should('have.value', upperValue);
  });

  it(`should limit the lower value to ${sliderHandleGap} below the sliderMax if it is set too high`, () => {
    const lowerValue = sliderMax - sliderHandleGap;

    cy.get('#upperInput').realClick({ force: true }).realType('{backspace}{backspace}{backspace}', { force: true }).realType('500', { force: true });
    cy.get('#upperInput').should('have.value', '500');
    cy.get('#lowerInput').realClick({ force: true }).realType('{backspace}{backspace}', { force: true }).realType('500', { force: true });
    cy.get('.double-range-slider').realClick({ force: true });
    cy.get('#lowerInput').should('have.value', lowerValue);
  });

  it('should limit the upper value to the sliderMax if it is set too high', () => {
    cy.get('.double-range-slider').should('exist');
    cy.get('.range-slider-upper').invoke('val', 600).trigger('change', { force: true });
    cy.get('.range-slider-upper').should('have.value', `${sliderMax}`);
    cy.get('#upperInput').realClick({ force: true }).realType('{backspace}{backspace}{backspace}', { force: true }).realType('600', { force: true });
    cy.get('.double-range-slider').realClick({ force: true });
    cy.get('#upperInput').should('have.value', `${sliderMax}`);
  });

  it('should limit the lower value to the sliderMin if it is set too low', () => {
    cy.get('.double-range-slider').should('exist');
    cy.get('.range-slider-lower').invoke('val', -100).trigger('change', { force: true });
    cy.get('.range-slider-lower').should('have.value', `${sliderMin}`);
    cy.get('#lowerInput').realClick({ force: true }).realType('{backspace}{backspace}', { force: true }).realType('10', { force: true });
    cy.get('.double-range-slider').realClick({ force: true });
    cy.get('#lowerInput').should('have.value', `${sliderMin}`);
  });

  it(`should limit the upper value to ${sliderHandleGap} above the sliderMin if it is set too low`, () => {
    const upperInput = sliderMin + sliderHandleGap;

    cy.get('.double-range-slider').should('exist');
    cy.get('.range-slider-upper').invoke('val', -100).trigger('change', { force: true });
    cy.get('.range-slider-upper').should('have.value', upperInput);
    cy.get('#upperInput').realClick({ force: true }).realType('{backspace}{backspace}{backspace}', { force: true }).realType('6', { force: true });
    cy.get('.double-range-slider').realClick({ force: true });
    cy.get('#upperInput').should('have.value', upperInput);
  });

  it('should correctly display the range slider position', () => {
    const leftPosition = (initialLowerVal - sliderMin) * (100 / (sliderMax - sliderMin));

    cy.get('.range-slider-range')
      .should('have.css', 'left', `${leftPosition.toString()}px`);
  });

  it('should not allow the upper value to be less than lower value during direct input', () => {
    cy.get('#upperInput').clear({ force: true }).type('40', { force: true }).blur({ force: true });
    cy.get('.range-slider-upper').should('have.value', '59');
  });

  it('should not allow the lower value to be greater than upper value during direct input', () => {
    cy.get('#lowerInput').clear({ force: true }).type('600', { force: true }).blur({ force: true });
    cy.get('.range-slider-lower').should('have.value', '491');
  });
});
