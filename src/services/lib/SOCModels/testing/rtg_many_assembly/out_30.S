.text

#The program checks the ALU instruction in I_type

Main:
		addi    x23 , x0 , -2048 
		addi    x11 , x0 , 169 
		sltu    x7 , x23 , x11 
		bltu    x23 , x11 , Less_i 
		bgeu    x23 , x11 , Bigger_i 
Less_i:
		ori     x3 , x23 , 158 
		sub     x5 , x11 , x23 
		srai    x5 , x5 , 4 
		and     x5 , x5 , x0 
		addi    x12 , x0 , 0 
		beq     x5 , x12 , Pass 
Bigger_i:
		ori     x3 , x23 , 103 
		sub     x5 , x11 , x23 
		srai    x5 , x5 , 3 
		and     x5 , x5 , x0 
		addi    x12 , x0 , 0 
		beq     x5 , x12 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
