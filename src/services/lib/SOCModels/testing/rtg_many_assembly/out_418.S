.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		add     x9 , x0 , x0 
		add     x31 , x0 , x0 
		addi    x2 , x0 , 68 
		addi    x24 , x0 , 2 
InArr:
		addi    x7 , x0 , 64 
		addi    x29 , x0 , 0 
		addi    x13 , x0 , 64 
		addi    x21 , x0 , 48 
		sb      x7 , 0 (x2) 
		sb      x29 , 4 (x2) 
		sb      x13 , 8 (x2) 
		sb      x21 , 12 (x2) 
Loop:
		sll     x20 , x31 , x24 
		add     x17 , x20 , x2 
		lbu     x12 , 0 (x17) 
		add     x9 , x9 , x12 
		addi    x31 , x31 , 1 
		beq     x31 , x19 , Result 
		jal     x0 , Loop 
Result:
		addi    x14 , x0 , 176 
		bne     x14 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
