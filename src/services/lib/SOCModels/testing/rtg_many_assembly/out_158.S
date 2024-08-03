.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x12 , x0 , 4 
		add     x25 , x0 , x0 
		add     x31 , x0 , x0 
		addi    x14 , x0 , 0 
		addi    x4 , x0 , 2 
InArr:
		addi    x10 , x0 , 32 
		addi    x24 , x0 , 20 
		addi    x1 , x0 , 32 
		addi    x28 , x0 , 52 
		sb      x10 , 56 (x14) 
		sb      x24 , 60 (x14) 
		sb      x1 , 64 (x14) 
		sb      x28 , 68 (x14) 
Loop:
		sll     x11 , x31 , x4 
		add     x29 , x11 , x14 
		lbu     x9 , 56 (x29) 
		add     x25 , x25 , x9 
		addi    x31 , x31 , 1 
		beq     x31 , x12 , Result 
		jal     x0 , Loop 
Result:
		addi    x20 , x0 , 136 
		bne     x20 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
