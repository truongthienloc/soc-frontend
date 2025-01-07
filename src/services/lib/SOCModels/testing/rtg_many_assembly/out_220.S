.text

#The program checks the ALU instruction in I_type

Main:
		addi    x14 , x0 , 36 
		addi    x31 , x0 , 164 
		sltiu   x16 , x14 , 164 
		bltu    x14 , x31 , Less_i 
		bgeu    x14 , x31 , Bigger_i 
Less_i:
		ori     x23 , x14 , 103 
		sub     x11 , x31 , x14 
		srai    x11 , x11 , 2 
		and     x11 , x11 , x0 
		addi    x10 , x0 , 0 
		beq     x11 , x10 , Pass 
Bigger_i:
		ori     x23 , x14 , 154 
		sub     x11 , x31 , x14 
		srai    x11 , x11 , 1 
		and     x11 , x11 , x0 
		addi    x10 , x0 , 0 
		beq     x11 , x10 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
