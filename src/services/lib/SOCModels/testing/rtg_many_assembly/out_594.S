.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x23 , x0 , 4 
		add     x25 , x0 , x0 
		add     x22 , x0 , x0 
		addi    x19 , x0 , 44 
		addi    x4 , x0 , 2 
InArr:
		addi    x15 , x0 , 20 
		addi    x27 , x0 , 56 
		addi    x30 , x0 , 8 
		addi    x18 , x0 , 64 
		sb      x15 , 48 (x19) 
		sb      x27 , 52 (x19) 
		sb      x30 , 56 (x19) 
		sb      x18 , 60 (x19) 
Loop:
		sll     x3 , x22 , x4 
		add     x16 , x3 , x19 
		lbu     x31 , 48 (x16) 
		add     x25 , x25 , x31 
		addi    x22 , x22 , 1 
		beq     x22 , x23 , Result 
		jal     x0 , Loop 
Result:
		addi    x24 , x0 , 148 
		bne     x24 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
