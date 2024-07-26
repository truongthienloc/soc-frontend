.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x10 , x0 , 4 
		add     x13 , x0 , x0 
		add     x24 , x0 , x0 
		addi    x12 , x0 , 32 
		addi    x28 , x0 , 2 
InArr:
		addi    x20 , x0 , 52 
		addi    x30 , x0 , 8 
		addi    x8 , x0 , 8 
		addi    x1 , x0 , 20 
		sb      x20 , 20 (x12) 
		sb      x30 , 24 (x12) 
		sb      x8 , 28 (x12) 
		sb      x1 , 32 (x12) 
Loop:
		sll     x3 , x24 , x28 
		add     x15 , x3 , x12 
		lbu     x6 , 20 (x15) 
		add     x13 , x13 , x6 
		addi    x24 , x24 , 1 
		beq     x24 , x10 , Result 
		jal     x0 , Loop 
Result:
		addi    x29 , x0 , 88 
		bne     x29 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
