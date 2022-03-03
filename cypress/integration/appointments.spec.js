// Cypress tests for appointments

// tests for booking an appointment
describe("Should book an Interview", () => {
    it("should reset the API and visit root", () => {
      cy.request("GET", "/api/debug/reset")
      cy.visit("/");
    });

    it("Should click the + button", () => {
      cy.get(':nth-child(2) > .appointment__add > .appointment__add-button').click()
      cy.get('.appointment__card').should("have.class", "appointment__card appointment__card--create")
    });
    it ("Should type into input field", () => {
      cy.get('[data-testid="student-name-input"]').type('Chris De Groot');
      cy.get('[data-testid="student-name-input"]').should("have.value", "Chris De Groot");
    })
    it("Should click an interviewer", () => {
      cy.get(':nth-child(2) > .interviewers__item-image').click();
      cy.get('.interviewers__item--selected').should("have.class", "interviewers__item interviewers__item--selected")
    })

    it("Should book the interview", () => {
      cy.get('.button--confirm').click();
      cy.contains(".appointment__card--show", "Chris De Groot");
       cy.contains(".appointment__card--show", "Tori Malcolm");
    });
  });

  // tests for editing an appointment
  describe("Should edit an interview", () => {
    it("should edit an interview", () => {
      cy.get("[alt=Edit]")
        .first()
        .click({ force: true });
    
      cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
      cy.get("[alt='Tori Malcolm']").click();
    
      cy.contains("Save").click();
    
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Tori Malcolm");
    });

  });

  // tests for deleting an appointment
  describe("Should delete an interview", ()=>{
    it("should cancel an interview", () => {
      cy.get("[alt=Delete]")
        .first()
        .click({ force: true });
    
      cy.contains("Confirm").click();
    
      cy.contains("Deleting").should("exist");
      cy.contains("Deleting").should("not.exist");
    
      cy.contains(".appointment__card--show", "Archie Cohen")
        .should("not.exist");
    });
  })