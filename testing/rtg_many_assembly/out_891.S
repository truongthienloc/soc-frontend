.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x25 , x0 , 4 
		add     x12 , x0 , x0 
		add     x2 , x0 , x0 
		addi    x4 , x0 , 12 
		addi    x15 , x0 , 2 
InArr:
		addi    x16 , x0 , 52 
		addi    x7 , x0 , 12 
		addi    x26 , x0 , 20 
		addi    x10 , x0 , 24 
		sb      x16 , 56 (x4) 
		sb      x7 , 60 (x4) 
		sb      x26 , 64 (x4) 
		sb      x10 , 68 (x4) 
Loop:
		sll     x1 , x2 , x15 
		add     x23 , x1 , x4 
		lbu     x21 , 56 (x23) 
		add     x12 , x12 , x21 
		addi    x2 , x2 , 1 
		beq     x2 , x25 , Result 
		jal     x0 , Loop 
Result:
		addi    x30 , x0 , 108 
		bne     x30 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
