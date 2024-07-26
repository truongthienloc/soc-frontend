.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x26 , x0 , 4 
		add     x16 , x0 , x0 
		add     x15 , x0 , x0 
		addi    x1 , x0 , 32 
InArr:
		addi    x2 , x0 , 0 
		addi    x9 , x0 , 20 
		addi    x20 , x0 , 20 
		addi    x30 , x0 , 20 
		sb      x2 , 12 (x1) 
		sb      x9 , 16 (x1) 
		sb      x20 , 20 (x1) 
		sb      x30 , 24 (x1) 
Loop:
		slli    x27 , x15 , 2 
		add     x25 , x27 , x1 
		lb      x14 , 12 (x25) 
		add     x16 , x16 , x14 
		addi    x15 , x15 , 1 
		beq     x15 , x26 , Result 
		jal     x0 , Loop 
Result:
		addi    x18 , x0 , 60 
		bne     x18 , x16 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
