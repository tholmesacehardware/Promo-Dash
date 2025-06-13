
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { Store } from '../Step5_StoreSelection';

interface StoreCardProps {
  store: Store;
  isSelected: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
}

export const StoreCard = ({ 
  store, 
  isSelected, 
  onSelect, 
  onRemove, 
  showAddButton = false,
  showRemoveButton = false 
}: StoreCardProps) => {
  return (
    <Card className={`transition-colors ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs font-mono">
                Store #: {store.storeNumber}
              </Badge>
              {isSelected && (
                <Badge className="text-xs bg-blue-100 text-blue-800">
                  Selected
                </Badge>
              )}
            </div>
            <p className="font-medium text-sm mt-1">{store.storeName}</p>
            <p className="text-xs text-gray-600">{store.city}, {store.state}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {showAddButton && !isSelected && (
              <Button
                size="sm"
                variant="outline"
                onClick={onSelect}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            {showRemoveButton && (
              <Button
                size="sm"
                variant="outline"
                onClick={onRemove}
                className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-300"
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
