.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		add     x12 , x0 , x0 
		add     x18 , x0 , x0 
		addi    x23 , x0 , 36 
InArr:
		addi    x28 , x0 , 40 
		addi    x2 , x0 , 8 
		addi    x17 , x0 , 36 
		addi    x16 , x0 , 52 
		sw      x28 , 96 (x23) 
		sw      x2 , 100 (x23) 
		sw      x17 , 104 (x23) 
		sw      x16 , 108 (x23) 
Loop:
		slli    x30 , x18 , 2 
		add     x1 , x30 , x23 
		lw      x9 , 96 (x1) 
		add     x12 , x12 , x9 
		addi    x18 , x18 , 1 
		beq     x18 , x19 , Result 
		jal     x0 , Loop
Result:
		addi    x21 , x0 , 136 
		bne     x21 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
