.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , -2048 
		addi    x3 , x0 , 195 
		sltu    x6 , x29 , x3 
		bltu    x29 , x3 , Less_i 
		bgeu    x29 , x3 , Bigger_i 
Less_i:
		ori     x21 , x29 , 181 
		sub     x18 , x3 , x29 
		srai    x18 , x18 , 3 
		and     x18 , x18 , x0 
		addi    x25 , x0 , 0 
		beq     x18 , x25 , Pass 
Bigger_i:
		ori     x21 , x29 , 27 
		sub     x18 , x3 , x29 
		srai    x18 , x18 , 3 
		and     x18 , x18 , x0 
		addi    x25 , x0 , 0 
		beq     x18 , x25 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
