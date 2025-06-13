// src/components/Navigation.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // MUI Menu Icon
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // MUI Dropdown Icon

export const Navigation = () => {
  return (
    <AppBar position="static" sx={{
      backgroundColor: 'black', // Set background to black
      borderBottom: 1, // Add bottom border
      borderColor: 'grey.800', // Border color
      boxShadow: 'none', // Remove default AppBar shadow
    }}>
      <Toolbar sx={{
        maxWidth: '1280px', // Max width for content as in original
        width: '100%',
        mx: 'auto', // Center content horizontally
        px: 3, // Horizontal padding (MUI spacing unit, 3 * 8px = 24px, similar to px-6)
        height: 64, // Fixed height for the toolbar
        display: 'flex',
        justifyContent: 'space-between', // Distribute items horizontally
        alignItems: 'center', // Vertically center items
      }}>
        {/* Left Section: Menu Icon + ACE Hardware */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}> {/* gap for spacing between elements */}
          <IconButton
            edge="start"
            color="inherit" // Inherit color from AppBar's color (white)
            aria-label="menu"
            sx={{ color: 'white', '&:hover': { backgroundColor: 'grey.800' } }} // White icon, dark hover background
          >
            <MenuIcon sx={{ width: 20, height: 20 }} /> {/* Icon size */}
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 32, // Fixed width
              height: 32, // Fixed height
              backgroundColor: 'error.main', // Using theme's error color (often red)
              borderRadius: '4px', // Rounded corners
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>ACE</Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightSemiBold', color: 'white' }}>Hardware</Typography>
          </Box>
        </Box>

        {/* Center Section: Promo Dashboard */}
        <Box sx={{
          position: 'absolute', // Absolute positioning to center regardless of side content width
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'fontWeightSemiBold', color: 'white' }}>Promo Dashboard</Typography>
        </Box>

        {/* Right Section: 77 - ACME SUPPLY CO + Dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'grey.400' }}>77 - ACME SUPPLY CO</Typography>
          <ArrowDropDownIcon sx={{ width: 16, height: 16, color: 'grey.400' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};