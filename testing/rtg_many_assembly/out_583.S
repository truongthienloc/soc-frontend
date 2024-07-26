.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x15 , x0 , 4 
		add     x16 , x0 , x0 
		add     x27 , x0 , x0 
		addi    x22 , x0 , 36 
		addi    x10 , x0 , 2 
InArr:
		addi    x13 , x0 , 28 
		addi    x4 , x0 , 20 
		addi    x24 , x0 , 28 
		addi    x31 , x0 , 48 
		sb      x13 , 32 (x22) 
		sb      x4 , 36 (x22) 
		sb      x24 , 40 (x22) 
		sb      x31 , 44 (x22) 
Loop:
		sll     x23 , x27 , x10 
		add     x7 , x23 , x22 
		lbu     x2 , 32 (x7) 
		add     x16 , x16 , x2 
		addi    x27 , x27 , 1 
		beq     x27 , x15 , Result 
		jal     x0 , Loop 
Result:
		addi    x11 , x0 , 124 
		bne     x11 , x16 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
