.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x24 , x0 , 4 
		add     x22 , x0 , x0 
		add     x25 , x0 , x0 
		addi    x10 , x0 , 24 
		addi    x27 , x0 , 2 
InArr:
		addi    x11 , x0 , 32 
		addi    x26 , x0 , 76 
		addi    x12 , x0 , 24 
		addi    x6 , x0 , 68 
		sb      x11 , 12 (x10) 
		sb      x26 , 16 (x10) 
		sb      x12 , 20 (x10) 
		sb      x6 , 24 (x10) 
Loop:
		sll     x18 , x25 , x27 
		add     x1 , x18 , x10 
		lbu     x20 , 12 (x1) 
		add     x22 , x22 , x20 
		addi    x25 , x25 , 1 
		beq     x25 , x24 , Result 
		jal     x0 , Loop 
Result:
		addi    x8 , x0 , 200 
		bne     x8 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
