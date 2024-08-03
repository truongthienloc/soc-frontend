.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x12 , x0 , 4 
		add     x25 , x0 , x0 
		add     x7 , x0 , x0 
		addi    x26 , x0 , 20 
InArr:
		addi    x4 , x0 , 172 
		addi    x6 , x0 , 48 
		addi    x29 , x0 , 56 
		addi    x3 , x0 , 52 
		sw      x4 , 60 (x26) 
		sw      x6 , 64 (x26) 
		sw      x29 , 68 (x26) 
		sw      x3 , 72 (x26) 
Loop:
		slli    x17 , x7 , 2 
		add     x14 , x17 , x26 
		lw      x19 , 60 (x14) 
		add     x25 , x25 , x19 
		addi    x7 , x7 , 1 
		beq     x7 , x12 , Result 
		jal     x0 , Loop
Result:
		addi    x8 , x0 , 328 
		bne     x8 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
