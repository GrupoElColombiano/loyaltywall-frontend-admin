// import { render, screen, fireEvent } from "@testing-library/react";
// import PageOneSite from "./PageOneSite";

// describe("PageOneSite", () => {
//   test("renders the component", () => {
//     render(<PageOneSite />);

//     // Verifica que el componente se renderice correctamente
//     expect(screen.getByText("Nuevo sitio")).toBeInTheDocument();
//   });

//   test("handles input change", () => {
//     render(<PageOneSite />);

//     const siteNameInput = screen.getByLabelText("Nombre del sitio");
//     fireEvent.change(siteNameInput, {
//       target: { value: "Nuevo nombre del sitio" },
//     });

//     // Verifica que el valor del campo de entrada cambie correctamente
//     expect(siteNameInput.value).toBe("Nuevo nombre del sitio");
//   });

//   test("handles form submission", () => {
//     render(<PageOneSite />);

//     const saveButton = screen.getByRole("button", {
//       name: "Agregar nuevo sitio",
//     });
//     fireEvent.click(saveButton);

//     // Verifica que se maneje correctamente la presentación del formulario
//     expect(
//       screen.getByText("This is an error alert — check it out!")
//     ).toBeInTheDocument();
//   });
// });

// /pruebas unitarias
