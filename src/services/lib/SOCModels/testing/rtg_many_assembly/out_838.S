.text

#The program checks the ALU instruction in R_type

Main:
		addi    x24 , x0 , 82 
		addi    x8 , x0 , -17 
		addi    x21 , x0 , 46 
		addi    x11 , x0 , 173 
		addi    x12 , x0 , 4 
		blt     x24 , x8 , Less_r 
		bge     x24 , x8 , Bigger_r 
Less_r:
		sub     x16 , x21 , x11 
		and     x17 , x21 , x11 
		slt     x17 , x17 , x16 
		srl     x17 , x17 , x12 
		addi    x26 , x0 , -6 
		bne     x17 , x26 , Fail 
Bigger_r:
		or      x16 , x21 , x11 
		xor     x17 , x21 , x11 
		sltu     x17 , x17 , x16 
		sra     x17 , x17 , x12 
		addi    x26 , x0 , 19 
		bne     x17 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
