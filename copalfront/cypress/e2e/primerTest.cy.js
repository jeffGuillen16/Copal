
///<reference types="cypress" />
before(() => {
	cy.fixture('example').then((exampleData) => {
		cy.wrap(exampleData).as('exampleData')
	})
})

describe('The Home Page', () => {
	it('successfully loads', () => {
		cy.visit('/') // change URL to match your dev URL

		cy.visit('http://localhost:3000/socios')

		cy.get('.copal-button').click()
    
    	cy.get('@exampleData').then((exampleData) => {
		cy.get('#denominacion').type(exampleData.denominacion)

		cy.get('#cuit').type(exampleData.cuit)

		console.log('Valor de exampleData.tipoSocio:', exampleData.tipoSocio)

		// Verifica que el elemento select y sus opciones estén presentes y visibles
		cy.get('#tipoSocio').should('exist').should('be.visible')
		// Espera a que al menos una opción tenga el valor esperado
		cy.get('#tipoSocio option', { timeout: 10000 }).should(
			'have.length.gt',
			0
		)
		cy.get('#tipoSocio option[value=EMPRESA]').should('exist')
		// Selecciona la opción deseada
		cy.get('#tipoSocio').select(exampleData.tipoSocio)

		cy.get('.btn').should('exist').should('be.visible')
		cy.get('.btn').click()
		cy.get('.dropdown-menu').contains(exampleData.areaSocio).click()

		cy.get('#descripcion').type(exampleData.descripcion)
		cy.get('#mail').type(exampleData.email)
		cy.get('#telefono').type(exampleData.telefono)
		cy.get('#sitioWeb').type(exampleData.sitioWeb)
		

		//cy.get('#provincias')

		// Verifica que el elemento select con el id 'provincias' esté presente y visible
		cy.get('#provincias').should('exist').should('be.visible')

		// Espera a que al menos una opción tenga el valor esperado (puedes ajustar el timeout según tus necesidades)
		cy.get('#provincias option', { timeout: 10000 }).should(
			'have.length.gt',0)

		// Verifica que la opción 'Catamarca' esté presente en el elemento select
		cy.get('#provincias').should('contain', 'Catamarca')

		// Selecciona la opción deseada
		cy.get('#provincias').select('Catamarca')

    cy.get('#calle').type(exampleData.calle)
    cy.get('#altura').type(exampleData.altura)
    cy.get('#departamento').type(exampleData.nroDepartamento)
    cy.get('#piso').type(exampleData.piso)

			
    
	})
	})
})
