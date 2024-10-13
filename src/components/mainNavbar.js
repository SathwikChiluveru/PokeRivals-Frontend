'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import Image from 'next/image';
import PokeBall from '../../public/PokeBall.png';

const Logo = () => {
  return <Image src={PokeBall} alt="PokeBall" height={40} />;
};

const Links = [
  { text: 'Build Team', route: '#' },
  { text: 'Tournament', route: '#' },
  { text: 'Leaderboard', route: '#' }
];

const NavLink = ({ text, route }) => {
  return (
    <Link href={route} passHref>
      <Box
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('white', 'white'),
        }}
      >
        <Text as="span">{text}</Text>
      </Box>
    </Link>
  );
};

export default function MainNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="#FFC020" px={20}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link href={'/'}>
              <Box color={'white'}>
                <Logo />
              </Box>
            </Link>
            <HStack color={'black'} as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map(({ text, route }) => (
                <NavLink key={text} text={text} route={route} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                  _hover={{ textDecoration: 'none' }}>
                  <Flex alignItems="center" flexDirection="row">
                    <Text color={'black'} mr={'10px'}>Name</Text>
                    <Avatar
                      size={'sm'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Flex>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Hello!</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(({ text, route }) => (
                <NavLink key={text} text={text} route={route} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
