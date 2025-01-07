.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x18 , x0 , 4 
		add     x29 , x0 , x0 
		add     x16 , x0 , x0 
		addi    x22 , x0 , 28 
InArr:
		addi    x31 , x0 , 164 
		addi    x6 , x0 , 56 
		addi    x17 , x0 , 48 
		addi    x2 , x0 , 28 
		sw      x31 , 104 (x22) 
		sw      x6 , 108 (x22) 
		sw      x17 , 112 (x22) 
		sw      x2 , 116 (x22) 
Loop:
		slli    x20 , x16 , 2 
		add     x24 , x20 , x22 
		lw      x26 , 104 (x24) 
		add     x29 , x29 , x26 
		addi    x16 , x16 , 1 
		beq     x16 , x18 , Result 
		jal     x0 , Loop
Result:
		addi    x21 , x0 , 296 
		bne     x21 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
