.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x22 , x0 , 4 
		add     x10 , x0 , x0 
		add     x12 , x0 , x0 
		addi    x13 , x0 , 32 
InArr:
		addi    x28 , x0 , 24 
		addi    x5 , x0 , 8 
		addi    x4 , x0 , 52 
		addi    x29 , x0 , 40 
		sw      x28 , 64 (x13) 
		sw      x5 , 68 (x13) 
		sw      x4 , 72 (x13) 
		sw      x29 , 76 (x13) 
Loop:
		slli    x2 , x12 , 2 
		add     x14 , x2 , x13 
		lw      x18 , 64 (x14) 
		add     x10 , x10 , x18 
		addi    x12 , x12 , 1 
		beq     x12 , x22 , Result 
		jal     x0 , Loop
Result:
		addi    x3 , x0 , 124 
		bne     x3 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
