"use client";

import React from "react";
import { getComponentData } from "@/services/componentDataService";
import { DocsComponent, ChangelogComponent } from "@/types";

export type ComponentDataType = DocsComponent | ChangelogComponent;

export type ComponentTypeMap = {
    DocsComponent: DocsComponent;
    ChangelogComponent: ChangelogComponent;
};

interface ComponentDataContextType {
    getComponentData: <T extends keyof ComponentTypeMap>(componentId: T) => Promise<ComponentTypeMap[T]>;
    cachedData: Partial<ComponentTypeMap>;
    loadingStates: Record<string, boolean>;
    errorStates: Record<string, Error | null>;
    clearComponentCache: (componentId: keyof ComponentTypeMap) => void;
    clearAllCache: () => void;
    preloadComponent: <T extends keyof ComponentTypeMap>(componentId: T) => Promise<void>;
}

const ComponentDataContext = React.createContext<ComponentDataContextType | undefined>(undefined);

interface ComponentDataProviderProps {
    children: React.ReactNode;
}

export function ComponentDataProvider({ children }: ComponentDataProviderProps): React.ReactElement {
    const [cachedData, setCachedData] = React.useState<Partial<ComponentTypeMap>>({});
    const [loadingStates, setLoadingStates] = React.useState<Record<string, boolean>>({});
    const [errorStates, setErrorStates] = React.useState<Record<string, Error | null>>({});

    const updateLoadingState = React.useCallback((componentId: string, isLoading: boolean) => {
        setLoadingStates(prev => ({ ...prev, [componentId]: isLoading }));
    }, []);

    const updateErrorState = React.useCallback((componentId: string, error: Error | null) => {
        setErrorStates(prev => ({ ...prev, [componentId]: error }));
    }, []);

    const fetchComponentData = React.useCallback(async <T extends keyof ComponentTypeMap>(
        componentId: T
    ): Promise<ComponentTypeMap[T]> => {
        if (cachedData[componentId]) {
            return cachedData[componentId] as ComponentTypeMap[T];
        }

        updateLoadingState(componentId, true);
        updateErrorState(componentId, null);

        try {
            const data = await getComponentData<ComponentTypeMap[T]>(componentId);
            setCachedData(prev => ({
                ...prev,
                [componentId]: data
            }));

            updateLoadingState(componentId, false);
            return data;
        } catch (error) {
            updateErrorState(componentId, error as Error);
            updateLoadingState(componentId, false);
            throw error;
        }
    }, [cachedData, updateLoadingState, updateErrorState]);

    const clearComponentCache = React.useCallback((componentId: keyof ComponentTypeMap) => {
        setCachedData(prev => {
            const newData = { ...prev };
            delete newData[componentId];
            return newData;
        });
        updateErrorState(componentId, null);
    }, [updateErrorState]);

    const clearAllCache = React.useCallback(() => {
        setCachedData({});
        setErrorStates({});
    }, []);

    const preloadComponent = React.useCallback(async <T extends keyof ComponentTypeMap>(componentId: T): Promise<void> => {
        try {
            await fetchComponentData(componentId);
        } catch {
            // ignored
        }
    }, [fetchComponentData]);

    const contextValue: ComponentDataContextType = React.useMemo(() => ({
        getComponentData: fetchComponentData,
        cachedData,
        loadingStates,
        errorStates,
        clearComponentCache,
        clearAllCache,
        preloadComponent,
    }), [cachedData, loadingStates, errorStates, fetchComponentData, clearComponentCache, clearAllCache, preloadComponent]);

    return (
        <ComponentDataContext.Provider value={contextValue}>
            {children}
        </ComponentDataContext.Provider>
    );
}

export function useComponentData(): ComponentDataContextType {
    const context = React.useContext(ComponentDataContext);
    if (!context) {
        throw new Error("useComponentData must be used within a ComponentDataProvider");
    }
    return context;
}

export function useDocsComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.DocsComponent && !loadingStates.DocsComponent && !errorStates.DocsComponent) {
            getComponentData("DocsComponent").catch(console.error);
        }
    }, [cachedData.DocsComponent, loadingStates.DocsComponent, errorStates.DocsComponent, getComponentData]);

    return {
        data: cachedData.DocsComponent as DocsComponent,
        isLoading: loadingStates.DocsComponent || false,
        error: errorStates.DocsComponent,
    };
}

export function useChangelogComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.ChangelogComponent && !loadingStates.ChangelogComponent && !errorStates.ChangelogComponent) {
            getComponentData("ChangelogComponent").catch(console.error);
        }
    }, [cachedData.ChangelogComponent, loadingStates.ChangelogComponent, errorStates.ChangelogComponent, getComponentData]);

    return {
        data: cachedData.ChangelogComponent as ChangelogComponent,
        isLoading: loadingStates.ChangelogComponent || false,
        error: errorStates.ChangelogComponent,
    };
}
