import { checkPropTypes } from "prop-types";

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("Should navigate to Tuesday", () => {
    cy.get('li').contains(/tuesday/i).click();

  });
  it("should have Tuesday selected", ()=>{
      cy.contains("li", /tuesday/i)
      .should("have.class", "day-list__item--selected")
  })
  it("Should book an interview", () => {
    cy.get(':nth-child(1) > .appointment__add > .appointment__add-button').click()
    cy.get('.appointment__card').should("have.class", "appointment__card appointment__card--create")
    cy.get('[data-testid="student-name-input"]').type('Chris De Groot');
    cy.get(':nth-child(2) > .interviewers__item-image').click();
    cy.get('.button--confirm').click();
    cy.get('.appointment__card-left > h2.text--regular').should("have.text", "Chris De Groot");
    cy.get('.interviewer > .text--regular').should("have.text", "Tori Malcolm")
    
  })
  it("Should edit an interview", () => {
    
  })
  it("Should cancel an interview", () => {
    
  })
});