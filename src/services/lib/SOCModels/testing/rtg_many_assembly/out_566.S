.text

#The program checks the ALU instruction in R_type

Main:
		addi    x29 , x0 , 191 
		addi    x8 , x0 , 92 
		addi    x15 , x0 , 57 
		addi    x16 , x0 , 98 
		addi    x22 , x0 , 4 
		blt     x29 , x8 , Less_r 
		bge     x29 , x8 , Bigger_r 
Less_r:
		sub     x6 , x15 , x16 
		and     x1 , x15 , x16 
		slt     x1 , x1 , x6 
		srl     x1 , x1 , x22 
		addi    x2 , x0 , -1 
		bne     x1 , x2 , Fail 
Bigger_r:
		or      x6 , x15 , x16 
		xor     x1 , x15 , x16 
		sltu     x1 , x1 , x6 
		sra     x1 , x1 , x22 
		addi    x2 , x0 , 13 
		bne     x1 , x2 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
