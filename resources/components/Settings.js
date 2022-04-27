import { Flex, 
    IconButton,  
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, Input, Switch, useColorMode, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import {FaCog} from 'react-icons/fa'
const Settings = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = React.useState(props.isDark)
    let {colorMode, toggleColorMode} = useColorMode()
    const [isPhoneDisplay] = useMediaQuery('(max-width: 420px)') 
    const [isSurfaceDuo] = useMediaQuery('only screen and (-webkit-min-device-pixel-ratio: 2.5)')
    React.useEffect(() => {
        setValue(props.isDark)
        if(props.isDark == true && colorMode == 'light'){
            toggleColorMode()
        }
        else if(props.isDark == false && colorMode == 'dark'){
            toggleColorMode()
        }
})
    
  return  (
    <Flex
        justifyContent={'flex-end'}
        width={[270, 400, 600, 650]}
    >
        {(isPhoneDisplay || isSurfaceDuo) ? <Button colorScheme='white' variant='link' onClick={onOpen}>Settings</Button> : <IconButton marginTop='1ex' variant='outline' onClick={onOpen} borderWidth={2} borderColor='white' icon={<FaCog />}/>}
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Change Name: 
            <Input placeholder='Name' onChange={props.onChangeName}/>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Settings