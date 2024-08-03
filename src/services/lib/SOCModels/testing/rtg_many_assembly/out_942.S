.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x6 , x0 , 4 
		add     x16 , x0 , x0 
		add     x31 , x0 , x0 
		addi    x2 , x0 , 20 
		addi    x28 , x0 , 2 
InArr:
		addi    x5 , x0 , 36 
		addi    x19 , x0 , 16 
		addi    x24 , x0 , 20 
		addi    x12 , x0 , 72 
		sb      x5 , 36 (x2) 
		sb      x19 , 40 (x2) 
		sb      x24 , 44 (x2) 
		sb      x12 , 48 (x2) 
Loop:
		sll     x13 , x31 , x28 
		add     x17 , x13 , x2 
		lbu     x4 , 36 (x17) 
		add     x16 , x16 , x4 
		addi    x31 , x31 , 1 
		beq     x31 , x6 , Result 
		jal     x0 , Loop 
Result:
		addi    x26 , x0 , 144 
		bne     x26 , x16 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
