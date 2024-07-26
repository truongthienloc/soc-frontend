.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x7 , x0 , 4 
		add     x5 , x0 , x0 
		add     x25 , x0 , x0 
		addi    x16 , x0 , 60 
InArr:
		addi    x14 , x0 , 32 
		addi    x4 , x0 , 68 
		addi    x10 , x0 , 68 
		addi    x15 , x0 , 28 
		sb      x14 , 52 (x16) 
		sb      x4 , 56 (x16) 
		sb      x10 , 60 (x16) 
		sb      x15 , 64 (x16) 
Loop:
		slli    x11 , x25 , 2 
		add     x23 , x11 , x16 
		lb      x31 , 52 (x23) 
		add     x5 , x5 , x31 
		addi    x25 , x25 , 1 
		beq     x25 , x7 , Result 
		jal     x0 , Loop 
Result:
		addi    x21 , x0 , 196 
		bne     x21 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
