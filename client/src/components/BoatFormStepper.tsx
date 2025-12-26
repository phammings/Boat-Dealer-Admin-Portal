import * as React from "react"
import { defineStepper } from "@/components/ui/stepper"

const { Stepper } = defineStepper(
  { id: "step-1", title: "Boat Details" },
  { id: "step-2", title: "Photos" },
  { id: "step-3", title: "Videos" }
)

interface StepperUIProps {
  currentStep: number // 1-based index
}

export function BoatFormStepper({ currentStep }: StepperUIProps) {
  const totalSteps = 3

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Progress label */}
      <div className="text-sm font-medium text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </div>

      <Stepper.Provider
        variant="horizontal"
        labelOrientation="vertical"
      >
        {({ methods }) => {
          // Navigate to the current step whenever prop changes
          React.useEffect(() => {
            const step = methods.all[currentStep - 1]
            if (step) methods.goTo(step.id)
          }, [currentStep, methods])

          return (
            <Stepper.Navigation>
              {methods.all.map((step) => (
                <Stepper.Step key={step.id} of={step.id} style={{ cursor: "default" }} >
                  <Stepper.Title>{step.title}</Stepper.Title>
                </Stepper.Step>
              ))}
            </Stepper.Navigation>
          )
        }}
      </Stepper.Provider>
    </div>
  )
}
