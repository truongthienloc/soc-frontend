.text

#The program checks the ALU instruction in R_type

Main:
		addi    x29 , x0 , 61 
		addi    x25 , x0 , -38 
		addi    x11 , x0 , 113 
		addi    x9 , x0 , 101 
		addi    x12 , x0 , 1 
		blt     x29 , x25 , Less_r 
		bge     x29 , x25 , Bigger_r 
Less_r:
		sub     x21 , x11 , x9 
		and     x22 , x11 , x9 
		slti    x22 , x22 , 16 
		srl     x22 , x22 , x12 
		addi    x4 , x0 , 54 
		bne     x22 , x4 , Fail 
Bigger_r:
		or      x21 , x11 , x9 
		xor     x22 , x11 , x9 
		sltiu   x22 , x22 , 20 
		sra     x22 , x22 , x12 
		addi    x4 , x0 , 68 
		bne     x22 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
