import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react' // componentes da biblioeca bonita 

  const PrioritySelect = ({ currentPriority, onPriorityChange, todoId, corPrioridade }) => { // função com 4 props 
      const handleChange = (newPriority) => {
          onPriorityChange(todoId, newPriority)
      } // cria um handle que receba a prioridade que vai ser selecionada e passa a ela a prioridade atualizada

      return (
          <Menu as="div" className="relative">
              <MenuButton className="focus:outline-none">
                  <div
                      className={`w-3 h-3 rounded-full cursor-pointer hover:scale-150 transition-transform
  ${corPrioridade[currentPriority || 'NORMAL'].color}`}
                      title={`Prioridade: ${corPrioridade[currentPriority || 'NORMAL'].label}`} // coloca um titlezinho no hover que passa o label 
                  />
              </MenuButton>

              <MenuItems className="absolute top-6 left-0 z-50 bg-black border border-gray-600 rounded-lg shadow-lg py-1
  min-w-[120px] focus:outline-none">
                  {Object.entries(corPrioridade).map(([priority, config]) => ( // transforma o corprioridade em uma array e mapeia pra aparecer bem bonito
                      <MenuItem key={priority}>
                          <button
                              onClick={() => handleChange(priority)} // executa a função de atualização 
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-700/30 transition-colors text-left"
                          >
                              <div className={`w-3 h-3 rounded-full ${config.color}`} />
                              <span className="text-sm text-white">{config.label}</span>
                          </button>
                      </MenuItem>
                  ))}
              </MenuItems>
          </Menu>
      )
  }

  export default PrioritySelect
