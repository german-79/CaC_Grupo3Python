const medicos = [
    {
        name: "Dra Inge Solle",
        terapia: "auriculoterapia",
        thumbnail: "profesional_01.webp",
        matricula: "MP 15797"
    },
    {
        name: "Dr Facundo Irigoyen",
        terapia: ["auriculoterapia", "masaje"],
        thumbnail: "profesional_02.webp",
        matricula: "14137"
    },
    {
        name: "Dra Annabella McRae",
        terapia: "acupuntura",
        thumbnail: "profesional_03.webp",
        matricula: "11703"
    },
    {
        name: "Dr Roberto Scheitling",
        terapia: ["acupuntura", "ventosa"],
        thumbnail: "profesional_04.webp",
        matricula: "18290"
    },
    {
        name: "Dra Christabel Anderson",
        terapia: ["moxibustion", "ventosa"],
        thumbnail: "profesional_05.webp",
        matricula: "16623"
    },
    {
        name: "Dr Maximo Balanta",
        terapia: ["moxibustion", "masaje"],
        thumbnail: "profesional_06.webp",
        matricula: "13912"
    }
]

const root = document.getElementById("root")
let terapiaDefault = "masaje"

function renderFiltros() {
    const containerFiltros = document.querySelector("#filtros")

    containerFiltros.innerHTML = /*html*/`
      <div class=fotochina>
        <div class=filtro>
        <h1 class="title-filter">Profesionales</h1>
        <p>Contamos con una amplia red de profesionales que te permitirá encontrar el de tu confianza aquí.</p>
        <ul class="category-filters">
            <li data-filter="auriculoterapia">AURICULOTERAPIA</li>
            <li data-filter="acupuntura">ACUPUNTURA</li>
            <li data-filter="moxibustion">MOXIBUSTIÓN</li>
            <li data-filter="masaje">MASAJE TUINA</li>
            <li data-filter="ventosa">VENTOSA</li>
        </ul>
        </div>
        </div>
    `

    const categoryFilters = document.querySelectorAll(".category-filters li")

    categoryFilters.forEach(function (categoryFilter) {
        categoryFilter.addEventListener("click", function () {
            const terapiaSeleccionada = this.getAttribute("data-filter")
            terapiaDefault = terapiaSeleccionada
            renderMedicos()
    })
})

}


function renderMedicos() {
    
    let medicosTerapias = medicos.filter(function (medico) {
        if (typeof medico.terapia != "string") {
            return medico.terapia.includes(terapiaDefault)
          }
        return medico.terapia == terapiaDefault
    })

    console.log({medicosTerapias, terapiaDefault})

    root.innerHTML = /*html*/`
        <section class="profesionales">
            <h2>Terapeutas de ${terapiaDefault}</h2>
            <div class="cards">
                ${medicosTerapias.map(function (medico) {
                    const [genero, ...name] = medico.name.split(" ")
                    return /*html*/`
                    <div class="card">
                        <img src="/img/${medico.thumbnail}" alt="Foto de la doctora ${medico.name}">
                        <div class="footer-medico">
                            <div class="name-medico">${genero} <span>${name.join(" ")}</span></div>
                            <span class="matricula">MP: ${medico?.matricula ?? "1506241559" }</span>
                            <a href="turnos.html" data-id=${medico.matricula} class="turno">
                                SACAR TURNO
                            </a>
                        </div>
                    </div>
                    `
                }).join("")}
            </div>
        </section>

        
        `
    const turnos = document.querySelectorAll(".turno")
    turnos.forEach(function (turno) {
        turno.addEventListener("click", function () {
            const matricula = this.getAttribute("data-id")
            const href = this.getAttribute("href")
            const medico = medicos.find(function (medico) {
                return medico.matricula == matricula
            })
            
            window.localStorage.setItem("medico", JSON.stringify(medico))
            window.location.href = href
        })
    })
}
function main() {
    renderFiltros()
    renderMedicos()
}

main()