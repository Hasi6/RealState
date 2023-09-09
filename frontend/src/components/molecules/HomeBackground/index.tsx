import { BackgroundImage, Box, Center, Text } from '@mantine/core';
import HomeFilter from '../HomeFilter';

function HomeBackground() {
  return (
    <Box maw={'100%'} mx="auto" h={400}>
      <BackgroundImage
        h={'100%'}
        src="https://images.wallpaperscraft.com/image/single/sofa_chair_furniture_75449_1920x1080.jpg"
      >
        <Center className="pt-[100px]">
          <Text color="#fff" className="text-3xl">
            Looking To Buy or Rent a Property?
          </Text>
        </Center>
        <Center>
          <Text color="#fff" className="text-3xl">
            Find Your Dream Home
          </Text>
        </Center>
        <Center className="mt-[40px]">
          <HomeFilter />
        </Center>
      </BackgroundImage>
    </Box>
  );
}

export default HomeBackground;
