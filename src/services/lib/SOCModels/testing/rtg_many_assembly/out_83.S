.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x18 , x0 , 4 
		add     x6 , x0 , x0 
		add     x27 , x0 , x0 
		addi    x26 , x0 , 40 
InArr:
		addi    x16 , x0 , 48 
		addi    x30 , x0 , 28 
		addi    x11 , x0 , 4 
		addi    x2 , x0 , 32 
		sw      x16 , 108 (x26) 
		sw      x30 , 112 (x26) 
		sw      x11 , 116 (x26) 
		sw      x2 , 120 (x26) 
Loop:
		slli    x17 , x27 , 2 
		add     x4 , x17 , x26 
		lw      x3 , 108 (x4) 
		add     x6 , x6 , x3 
		addi    x27 , x27 , 1 
		beq     x27 , x18 , Result 
		jal     x0 , Loop
Result:
		addi    x21 , x0 , 112 
		bne     x21 , x6 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
