.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x3 , x0 , 4 
		add     x26 , x0 , x0 
		add     x19 , x0 , x0 
		addi    x2 , x0 , 60 
InArr:
		addi    x12 , x0 , 112 
		addi    x11 , x0 , 4 
		addi    x1 , x0 , 72 
		addi    x21 , x0 , 32 
		sw      x12 , 24 (x2) 
		sw      x11 , 28 (x2) 
		sw      x1 , 32 (x2) 
		sw      x21 , 36 (x2) 
Loop:
		slli    x27 , x19 , 2 
		add     x28 , x27 , x2 
		lw      x23 , 24 (x28) 
		add     x26 , x26 , x23 
		addi    x19 , x19 , 1 
		beq     x19 , x3 , Result 
		jal     x0 , Loop
Result:
		addi    x8 , x0 , 220 
		bne     x8 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
