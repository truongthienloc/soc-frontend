.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x8 , x0 , 4 
		add     x9 , x0 , x0 
		add     x28 , x0 , x0 
		addi    x17 , x0 , 16 
		addi    x27 , x0 , 2 
InArr:
		addi    x6 , x0 , 28 
		addi    x20 , x0 , 44 
		addi    x26 , x0 , 12 
		addi    x16 , x0 , 36 
		sb      x6 , 12 (x17) 
		sb      x20 , 16 (x17) 
		sb      x26 , 20 (x17) 
		sb      x16 , 24 (x17) 
Loop:
		sll     x1 , x28 , x27 
		add     x24 , x1 , x17 
		lbu     x21 , 12 (x24) 
		add     x9 , x9 , x21 
		addi    x28 , x28 , 1 
		beq     x28 , x8 , Result 
		jal     x0 , Loop 
Result:
		addi    x30 , x0 , 120 
		bne     x30 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
