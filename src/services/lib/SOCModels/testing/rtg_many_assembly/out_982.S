.text

#The program checks the ALU instruction in R_type

Main:
		addi    x20 , x0 , 82 
		addi    x1 , x0 , -17 
		addi    x11 , x0 , 87 
		addi    x6 , x0 , 195 
		addi    x26 , x0 , 3 
		blt     x20 , x1 , Less_r 
		bge     x20 , x1 , Bigger_r 
Less_r:
		sub     x21 , x11 , x6 
		and     x16 , x11 , x6 
		slti    x16 , x16 , 14 
		srl     x16 , x16 , x26 
		addi    x25 , x0 , -6 
		bne     x16 , x25 , Fail 
Bigger_r:
		or      x21 , x11 , x6 
		xor     x16 , x11 , x6 
		sltiu   x16 , x16 , 185 
		sra     x16 , x16 , x26 
		addi    x25 , x0 , 45 
		bne     x16 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
