// src/pages/Index.tsx
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { MetricsTiles } from '@/components/MetricsTiles'; // Named export
import { PromotionTabs } from '@/components/PromotionTabs'; // Named export
import { PromotionTable } from '@/components/PromotionTable'; // Named export as per the latest fix
import { PromotionChart } from '@/components/PromotionChart'; // Assuming named export
import { ActivitySidebar } from '@/components/ActivitySidebar'; // Assuming named export
import PromotionBuilder from '@/components/PromotionBuilder'; // Assuming default export
import { Button, Box, Grid } from '@mui/material'; // MUI components, added Grid
import { Plus } from 'lucide-react'; // Icon import

const Index = () => {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  // activeTab state will control which tab is active in PromotionTabs
  // and consequently, what data is shown in PromotionTable
  const [activeTab, setActiveTab] = useState('Current Promotions');

  // This function is passed to PromotionTable to open the side sheet for error details
  const handleOpenSideSheetForErrors = (promotionId: number) => {
    console.log(`Opening side sheet for promotion with ID: ${promotionId}`);
    // In a real application, you might also pass the promotionId to PromotionBuilder
    // to load specific error details. For now, it just opens the builder.
    setIsBuilderOpen(true);
  };

  // Define the padding value used consistently across the layout
  // spacing={3} typically means 24px (3 * 8px default unit)
  // so we need px on the outer Box to be at least that much.
  const containerPaddingX = 3; // Corresponds to theme.spacing(3) = 24px


  return (
    // Main container Box for the entire page, providing a minimum height and background color
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f8f8' }}>
      {/* Navigation component */}
      {/* To align the Navigation content with the main content, ensure the
          Navigation component internally uses a similar maxWidth and horizontal padding.
          Example: <Box sx={{ maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1200px', xl: '1536px' }, mx: 'auto', px: 3 }}>...</Box>
          inside the Navigation component's return. */}
      <Navigation />

      {/* Wrapper Box to control max-width and horizontal centering for the entire content.
          This Box now explicitly sets horizontal padding and responsive max-widths. */}
      <Box
        sx={{
          // Replaced fixed '7xl' maxWidth with responsive breakpoint values
          maxWidth: {
            xs: '100%', // Full width on extra-small screens
            sm: '600px', // Max 600px on small screens
            md: '900px', // Max 900px on medium screens
            lg: '1200px', // Max 1200px on large screens
            xl: '1536px', // Max 1536px on extra-large screens
          },
          mx: 'auto', // Center horizontally
          px: containerPaddingX, // Horizontal padding
          py: 4 // Vertical padding
        }}
      >
        {/* Main content layout, now a Grid container.
            We apply negative margins to the Grid container to counteract the outer padding
            and ensure that the first and last Grid items align with the outer Box's padding. */}
        <Grid
          container
          spacing={3} // Gutter/spacing between grid items
          // Apply negative margins equal to the spacing unit to pull the grid items
          // out to the edges of the parent Box's padding, effectively 'aligning' them.
          sx={{
            ml: `-${containerPaddingX * 8}px`, // Negative left margin: -24px
            width: `calc(100% + ${containerPaddingX * 8 * 2}px)`, // Adjust width to compensate for negative margins
            // The above two lines fix the content overflowing issue caused by Grid's default behavior with spacing.
          }}
        >
          {/* MetricsTiles component - spans all 12 columns */}
          <Grid item xs={12}>
            <MetricsTiles />
          </Grid>

          {/* Row for Promotion Tabs and "Create New Promotion" button */}
          <Grid
            item
            xs={12}
            container
            alignItems="flex-end"
            justifyContent="space-between"
            sx={{ mt: 1 }} // Reduced top margin as spacing prop handles much of it
          >
            {/* PromotionTabs component */}
            <Grid item xs={12} md={8} lg={9}>
              <PromotionTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </Grid>

            {/* "Create New Promotion" Button */}
            <Grid item xs={12} md={4} lg={3} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, mt: { xs: 2, md: 0 } }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#dc2626', // Red color for the button
                  color: 'white', // White text color
                  px: 3, // Horizontal padding
                  '&:hover': {
                    backgroundColor: '#b91c1c', // Darker red on hover
                  },
                }}
                onClick={() => setIsBuilderOpen(true)} // Opens the promotion builder
              >
                <Plus style={{ width: 16, height: 16, marginRight: 8 }} /> {/* Plus icon */}
                Create New Promotion
              </Button>
            </Grid>
          </Grid>

          {/* PromotionTable component - spans all 12 columns */}
          <Grid item xs={12}>
            <PromotionTable activeTab={activeTab} onOpenSideSheetForErrors={handleOpenSideSheetForErrors} />
          </Grid>

          {/* Row for Promotion Chart and Activity Sidebar */}
          <Grid
            item
            xs={12}
            container
            spacing={3}
            alignItems="flex-start"
            sx={{ mt: 1 }}
          >
            {/* PromotionChart - flexible width */}
            <Grid item xs={12} md={8}>
              <PromotionChart />
            </Grid>
            {/* ActivitySidebar - fixed width, but responsive within grid */}
            <Grid item xs={12} md={4}>
              <ActivitySidebar />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* PromotionBuilder side sheet, controlled by isBuilderOpen state */}
      <PromotionBuilder
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
      />
    </Box>
  );
};

export default Index;
